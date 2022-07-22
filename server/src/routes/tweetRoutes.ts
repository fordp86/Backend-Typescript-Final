import { Router } from 'express';
import { addTweet, editTweet, deleteTweet, getAllTweets, getTweet } from '../controllers/tweetController';

const router = Router();

router.get('/', getAllTweets);
router.get('/:tweetId', getTweet);
router.post('/', addTweet);
router.put('/:tweetId', editTweet);
router.delete('/:tweetId', deleteTweet);

export default router;