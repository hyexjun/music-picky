import { OverlayTrigger, Popover } from 'react-bootstrap';
import styled from 'styled-components';
import apis from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletPostId } from '../redux/modules/postSlice';

let navigate = null;

export const StBtn = styled.button`
  width: 70px;
  height: 30px;
  line-height: 50%;
  // textSizeAdjust:inherit;
  font-size: 13px;
  border-radius: 5px;
  border: none;
  &:hover {
    color: white;
    background-color: ${(props) => (props.del ? '#564592' : '#ca7df9')};
  }
  margin-bottom: ${(props) => (props.pop ? '15px' : '')};
  margin-left: ${(props) => (props.pop ? '45px' : '')};
`;

const onDelClick = (e) => {
  //   const navigate = useNavigate();
  //   const postId = useSelector(db=>db.deletPostId);
  const postId = e.target.value;
  apis.post_del2(postId);
  navigate('/mypage');
};

const onUpClick = (postId, userId) => {
  // console.log(postId, userId);
  // console.log(JSON.stringify(postId));
  navigate(`/postupdate/${userId}/${postId}`);
};

export const UpdateDeleteBtn = ({ postId, userId }) => {
  // console.log(postId);
  // const dispatch = useDispatch();
  // dispatch(deletPostId(postId));
  navigate = useNavigate();

  return (
    <div style={{ textAlign: 'right', marginBottom: '15px' }}>
      <StBtn onClick={() => onUpClick(postId, userId)}>Edit</StBtn>{' '}
      <StBtn del value={postId} onClick={onDelClick}>
        Delete
      </StBtn>
    </div>
  );
};
