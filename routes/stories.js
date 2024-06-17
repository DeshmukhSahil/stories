const express = require('express');
const router = express.Router();
const Story = require('../models/Story');

// Create a new story
router.post('/', async (req, res) => {
    const newStory = new Story({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    });

    try {
        const story = await newStory.save();
        res.status(201).json(story);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all stories
router.get('/', async (req, res) => {
    try {
        const stories = await Story.find();
        res.json(stories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single story
router.get('/:id', async (req, res) => {
    try {
        const story = await Story.findById(req.params.id);
        if (!story) return res.status(404).json({ message: 'Story not found' });
        res.json(story);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a story
router.put('/:id', async (req, res) => {
    try {
        const story = await Story.findByIdAndUpdate(
            req.params.id,
            { title: req.body.title, content: req.body.content, author: req.body.author },
            { new: true }
        );
        if (!story) return res.status(404).json({ message: 'Story not found' });
        res.json(story);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a story
router.delete('/:id', async (req, res) => {
    try {
        const story = await Story.findByIdAndDelete(req.params.id);
        if (!story) return res.status(404).json({ message: 'Story not found' });
        res.json({ message: 'Story deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
