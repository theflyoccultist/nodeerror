const express = require('express');
const app = express();
const port = 3000;

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "Error";

    console.log(err.stack);

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});

app.get('/', async (req, res) => {
    res.send("This endpoint works.")
});

app.get('/squarenumber/:num', async(req, res, next) => {
    let x = req.params.num;
    if (isNaN(x)){
        next(new Error("Input not a number"));
        return;
    }
    res.json({"square":x*x});
});

app.get('/cubenumber/:num', async (req, res, next) => {
    let x = req.params.num;
    if (isNaN(x)){
        const err = new Error('Invalid input');
        err.statusCode = 400;
        err.details = 'The Input must be a number';
        next(err);
    } else {
        res.json({"cube":x*x*x});
    }
});

app.get('/getelementatindex/:mystr/:idx', async (req, res, next) => {
    let mystr = req.params.mystr;
    let idx = req.params.idx;
    if (idx<=mystr.length) {
        let char = mystr.charAt(idx-1);
        res.json({"Element at index": char})
    } else {
        next(new Error("Index greater than string length"))
    }
});

app.listen(port, () => {
    console.log(`Server is running on httmp://localhost:${port}`);
});