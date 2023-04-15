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
$ pdf-paginator ./input.pdf -o ./ouput.pdf
```

If you want to skip a first page, `--skipFirst` option can be used.

```
$ pdf-paginator input.pdf -o output.pdf --skip-first
```

You can also skip multiple pages by using `--skip` option.

```
$ pdf-paginator input.pdf -o output.pdf --skip=3
```

If you want to change the side of the page you want the numbers placed, you can use `--side` option. (use "left" or "right")

```
$ pdf-paginator input.pdf --side="left" -o output.pdf
```

You can change the distance from the end of the page where the numbers will be placed by using `--offset` option.

```
$ pdf-paginator input.pdf --offset=30 -o output.pdf
```

## Development

Checkout this repository locally, then

```
$ npm install
$ node -r esm ./pdf-paginator.js  [file]
```
