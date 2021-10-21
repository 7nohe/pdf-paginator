# pdf-paginator
A CLI to paginate a pdf file.


## Installation & Usage

### Globally via npm

```
$ npm install -g pdf-paginator
$ pdf-paginator [file] [option]
```

### Running on-demand
Using npx you can run the script without installing it

```
$ npx pdf-paginator [file] [option]
```

### Example

```
$ pdf-generator ./input.pdf -o ./ouput.pdf
```

If you want to skip a first page, `--skip-first` option can be used.

```
$ pdf-paginator input.pdf -o output.pdf --skip-first
```

## Development

Checkout this repository locally, then

```
$ npm install
$ node -r esm ./pdf-paginator.js  [file]
```

