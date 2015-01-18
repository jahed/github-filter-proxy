# GitHub Filter Proxy
Server for accessing GitHub's API and filtering properties.

## Requirements
- NodeJS
- NPM

## Installation
Download the project and run the following:

```sh
npm install
```

## Usage
```sh
/path_to_src_dir/main.js --config PATH_TO_CONFIG_FILE [--port PORT]
```

See `./examples/example-config.json` for an example config.

You can specify a GitHub API token via the config or by setting a
`GITHUB_TOKEN` environment variable. The config takes precedence.

## License
*Licensed under MIT.*

Copyright (C) 2014 Jahed Ahmed

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.