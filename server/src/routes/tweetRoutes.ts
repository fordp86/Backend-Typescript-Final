import { Router } from 'express';
import { addTweet, editTweet, deleteTweet, getAllTweets, getTweet } from '../controllers/tweetController';

const router = Router();

router.get('/', getAllTweets);
router.get('/:id', getTweet);
router.post('/', addTweet);
router.put('/:id', editTweet);
router.delete('/:id', deleteTweet);

export default router;