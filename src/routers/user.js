var async = require('async');
var express = require('express');
var github = require('octonode');

function createUserRouter(config) {
	var ghClient = github.client(config.token || process.env.GITHUB_TOKEN);

	var userRouter = express.Router({
		mergeParams: true
	});

	userRouter.use(function checkUser(req, res, next) {
		if (req.params.user && config.users.indexOf(req.params.user) === -1) {
			res.status(404);
			res.json({
				'error': {
					'message': 'Username "' + req.params.user + '"" not found.'
				}
			});
			return;
		}

		next();
	});

	userRouter.get('/info', function getUserInfo(req, res) {
		var ghUser = ghClient.user(req.params.user);
		ghUser.info(function(err, info) {
			if(err) throw err;

			var trimmedInfo = {};
			config.infoFields.forEach(function(field) {
				trimmedInfo[field] = info[field];
			});

			res.json(trimmedInfo);
		});
	});

	userRouter.get('/repos', function getUserRepos(req, res) {
		var ghUser = ghClient.user(req.params.user);
		ghUser.repos(function(err, repos) {
			if(err) throw err;

			var publicRepos = repos.filter(function(repo) {
				return !repo.fork && !repo.private;
			});

			async.each(publicRepos, addMoreRepoDetails, function(err) {
				if(err) throw err;

				var trimmedRepos = repos.map(function(repo) {
					var trimmedRepo = {};
					config.repoFields.forEach(function(field) {
						trimmedRepo[field] = repo[field];
					});
					return trimmedRepo;
				});

				res.json(trimmedRepos);
			});
		});
	});

	function addMoreRepoDetails(repo, cb) {
		var detailAdders = [];

		if(config.repoFields.indexOf['languages'] !== -1) {
			detailAdders.push(addRepoLanguages);
		}

		async.applyEach(detailAdders, repo, cb);
	}

	function addRepoLanguages(repo, cb) {
		var ghRepo = ghClient.repo(repo.full_name);
		ghRepo.languages(function(err, languages) {
			if(err) cb(err);

			repo.languages = languages;
			cb();
		});
	}

	return userRouter;
}

module.exports = createUserRouter;