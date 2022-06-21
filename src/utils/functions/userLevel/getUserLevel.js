import levels from './levels';

/* 
  사용자의 점수와 레벨을 계산한다.
  1. 점수
    포스트 개수(2점) + 댓글 개수(1점) + 좋아요 받은 개수(1점)

  2. 레벨 
    1) 초린이: 점수 0 이상 30 미만
    2) 초록집사: 점수 30 이상 100 미만
    3) 초록현자: 점수 100 이상 250 미만
    4) 식물마스터: 점수 250 이상 500 미만
    5) 태양신: 점수 500 이상
*/
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

/* 
  주의: 비용이 많이 드는 연산이 될 수도 있다. 
  시간복잡도 O(n)
*/
function getLikeCount(posts) {
  return posts.reduce((acc, post) => acc + post.likes.length, 0);
}
