import { StTitle, StArtist, StContent } from './PostCard';

const MyCard = ({ post }) => {
  return (
    <>
      <div className='col'>
        <div className='card'>
          <img
            src={post.imageUrl}
            className='card-img-top'
            alt='앨범 이미지 설명글'
          />
          <div className='card-body'>
            <p className='card-text'>{post.userDto.username}님의 Pick!</p>
            <StTitle>{post.title}</StTitle>
            <StArtist>{post.artist}</StArtist>
            <StContent className='card-text'>
              {/* {shorts(post.content.slice(0, 19))} */}
              {post.content}
            </StContent>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCard;
