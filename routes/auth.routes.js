const {Router} = require('express');
const router = Router();

router.get('/test', async (req, res) => {
    await res.send('test');
});

//api/auth/register
router.post('/register', async (req, res) =>{
    await res.send('register');
});

//api/auth/login
router.post('/login', async (req, res) =>{
    await res.send('login');
});

module.exports = router;
