const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Data untuk teknologi dan alat
const techStack = [
    {
        id: 1,
        name: 'HTML',
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/1051/1051277.png',
        status: 'Advanced'
    },
    // Tambahkan data lainnya di sini
];

const tools = [
    {
        id: 1,
        name: 'Git',
        imageUrl: 'https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png',
        status: 'Version Control'
    },
    // Tambahkan data lainnya di sini
];

// Endpoint untuk mendapatkan data teknologi
app.get('/api/tech', (req, res) => {
    res.json(techStack);
});

// Endpoint untuk mendapatkan data alat
app.get('/api/tools', (req, res) => {
    res.json(tools);
});

// Data untuk posting
const posts = [
    {
        "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus.",
        "desc": "Vestibulum auctor ullamcorper enim ut vestibulum. Aliquam erat volutpat. Maecenas ac pulvinar turpis. Etiam imperdiet mi in nisi faucibus, non fermentum ipsum vulputate. Proin dictum tempus justo vitae auctor. Phasellus non dapibus mauris. Fusce tristique in purus ut vehicula. Phasellus condimentum scelerisque urna, at cursus nunc fermentum non. Aenean ut enim iaculis, tincidunt nisl at, pellentesque justo. Nullam rhoncus, mauris ac elementum accumsan, purus arcu convallis leo, nec ornare massa ligula a massa. Ut vitae imperdiet eros, at consequat tellus. Etiam non sollicitudin ante, eget ullamcorper nulla. Nunc ut felis arcu. Praesent efficitur imperdiet hendrerit. Nullam eu elit augue. Vivamus..",
        "slug": "excepturi-architecto-quos",
        "image": "https://picsum.photos/600/450",
        "date": "Mei 12, 2023",
        "content": "Content 1",
        "id": "1",
        "topics": "Technology"
    },
    // Tambahkan data lainnya di sini
];

// Endpoint untuk mendapatkan semua posting
app.get('/api/posts', (req, res) => {
    res.json(posts);
});

// Endpoint untuk mendapatkan posting berdasarkan ID
app.get('/api/posts/:id', (req, res) => {
    const postId = req.params.id;
    const post = posts.find(post => post.id === postId);
    if (!post) {
        res.status(404).json({ error: 'Post not found' });
    } else {
        res.json(post);
    }
});

// Endpoint untuk mendapatkan posting berdasarkan topik
app.get('/api/posts/topics/:topic', (req, res) => {
    const topic = req.params.topic;
    const filteredPosts = posts.filter(post => post.topics.includes(topic));
    res.json(filteredPosts);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
