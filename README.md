# js-iter-examples

Code examples from my talk "JavaScript iteration protocols"

This talk has been delivered at JSNation 2023 ([slides](https://loige.link/iter-nation)):

[!["JavaScript iteration protocols" talk cover](./images/iter-nation-cover.jpg)](https://loige.link/iter-nation)

---

## Prerequisites

Make sure to have a recent version of Node.js installed.

All the examples should work with Node.js 16 (but they have been tested with Node.js 20).


## Install

Simply clone the repo and install dependencies with `npm install`.


## Create some sample logs

To create a small sample log file, you can run:

```bash
node src/generate-log-file > logs.jsonl
```

To create a much bigger sample log file, you can run:

```bash
node src/generate-log-file 20000000 > logs-big.jsonl
```

Keep in mind that this operation might take a few minutes and that it will generate a big file (~3.6 GB).

## Run the log processor scripts

Now you can run the different implementations of the log processor scripts:

### [`process-eager.js`](./src/process-eager.js)

This is the first implementation (eager).

You can run it with:

```bash
node src/process-eager.js logs.jsonl
```

But if you try to run it with the bigger log file:

```bash
node src/process-eager.js logs-big.jsonl
```

You should see an error!


### [`process-iter.js`](./src/process-iter.js)

This is the optimised version, using async iterators.

You can run it with:

```bash
node src/process-iter.js logs.jsonl
```

And it will also be able to process the bigger log file:

```bash
node src/process-iter.js logs-big.jsonl
```

... which might take a couple of minutes, depending on your device power.


### [`process-iter-helpers.js`](./src/process-iter-helpers.js)

This is a version of the previous script using `.map()`, `.filter()`, and `.reduce()` through [`core-js`](https://github.com/zloirock/core-js/).

Check it out and compare the code with the previous implementation.


## Additional material

If you are interested in these kinds of topics, you might also enjoy:

- My [FREE workshop on JavaScript iteration protocols](https://loige.link/iter-wrk)
- My [FREE workshop on Node.js streams](https://loige.link/streams-wrk)

(If you like them, please remember to give them a star and share them with your friends 😇)



## Shameless plug 😇

<a href="https://www.nodejsdesignpatterns.com"><img width="240" align="right" src="https://github.com/lmammino/lmammino/blob/master/nodejsdp.jpg?raw=true"></a>

If you like this piece of work, consider supporting me by getting a copy of [Node.js Design Patterns, Third Edition](https://www.nodejsdesignpatterns.com/), which also goes into great depth about generators, iterator protocols, streams and related design patterns.

If you already have this book, **please consider writing a review** on Amazon, Packt, GoodReads or in any other review channel that you generally use. That would support us greatly 🙏.


## Contributing

In the spirit of Open Source, everyone is very welcome to contribute to this project.
You can contribute just by submitting bugs or suggesting improvements by
[opening an issue on GitHub](https://github.com/lmammino/iteration-protocols-workshop/issues) or by [submitting a PR](https://github.com/lmammino/iteration-protocols-workshop/pulls).


## License

Licensed under [MIT License](LICENSE). © Luciano Mammino.
