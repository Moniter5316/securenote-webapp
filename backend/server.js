const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT  ;
app.use(cors());
app.use(express.json());

let notes = [
    {id:1, title: 'Note 1', content: 'This is the first note.'},
];
 app.get('/api/notes', (req, res) => {
    res.status(200).json(notes);
 });

 app.post('/api/notes', (req, res) => {
    const token = req.headers['authorization'];
    if (token !==process.env.SECRET_TOKEN) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const { title, content } = req.body;
    const newNote = { id: Date.now(), title, content };
    notes.push(newNote);
    res.status(201).json(newNote);
 });

 app.delete('/api/notes/:id', (req, res) => {
    const token = req.headers['authorization'];
    if (token !== process.env.SECRET_TOKEN) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const id = parseInt(req.params.id);
    notes = notes.filter(note => note.id !== id);
    res.status(204).send();
 });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});