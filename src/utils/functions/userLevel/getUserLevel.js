import levels from './levels';

export default function getUserLevel({ posts, comments, followers }) {
  const score = 2 * posts.length + comments.length + followers.length;
  let level;
  if (score >= 0 && score < 30) {
    level = levels[0];
  }
  if (score >= 30 && score < 100) {
    level = levels[1];
  }
  if (score >= 100 && score < 250) {
    level = levels[2];
  }
  if (score >= 250 && score < 500) {
    level = levels[3];
  }
  if (score >= 500) {
    level = levels[4];
  }
  return {
    score,
    level,
  };
}
