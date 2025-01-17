import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap';
import AbstractModalHeader from 'react-bootstrap/esm/AbstractModalHeader';
import apis from '../api/axios';
import {
  createCommentAX,
  deleteCommentAX,
  loadCommentAX,
} from '../redux/modules/postSlice';
import { getCookie } from '../shared/Cookie';
import { Prev } from 'react-bootstrap/esm/PageItem';
import styled from 'styled-components';

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

const ComCard = ({ post, changeState, setChangeState, comments }) => {
  const dispatch = useDispatch();
  // const [post, setPost] = useState();
  const [likeCnt, setLikeCnt] = useState();
  const [heart, setHeart] = useState(false);
  // const uid = post?.uid;
  const postId = post?.postId;
  const comRef = useRef();
  const username = getCookie('username');
  const userId = getCookie('userId');

  const heartOnUid = { uid: 1 };
  const heartOffUid = { uid: 0 };

  // 현재 댓글, 좋아요 부분의 동적인 화면 구성을 위해 화면 다시 짜야함.
  // 리덕스를 사용하는 것으로 반영이 되어야함

  // console.log("댓글화면쪽", postId, comments);
  // console.log(comments);
  // post를 dependency 에 넣으니 버벅대지만 하트 작동!
  useEffect(() => {
    if (post?.uid === 1) {
      setHeart(true);
    } else if (post?.uid === 0) {
      setHeart(false);
    }
  }, [post]);

  //댓글 등록시 실행되는 함수

  const handleCom = (e) => {
    const comment = comRef.current.value;
    const new_comment = {
      userId: username,
      comment: comment,
    };

    if (username !== undefined) {
      dispatch(createCommentAX(postId, new_comment));
    } else {
      alert('로그인 후 사용해 주세요!');
    }

    setChangeState((Prev) => {
      return !Prev;
    });
  };

  useEffect(() => {}, [changeState, heart]);

  const handleHeart = () => {
    // console.log(post.postId)
    if (userId === undefined) {
      alert('로그인 후 이용하세요!');
    } else if (heart) {
      setHeart(false);
      // console.log('하트를 눌렀을 때', heartOn, 서버기준)
      apis.post_heart2(postId, heartOnUid).then((res) => {
        // setLikeCnt(likeCnt-1);
        setLikeCnt(res?.data.data.likeCnt);
        // console.log(res.data.data.likeCnt)
        setChangeState((Prev) => !Prev);
      });
    } else {
      setHeart(true);
      // console.log('빈 하트를 눌렀을 때', heartOff, 서버기준)
      apis.post_heart2(postId, heartOffUid).then((res) => {
        // setLikeCnt(likeCnt + 1);
        // console.log(res.data.data.likeCnt)
        setLikeCnt(res?.data.data.likeCnt);
        setChangeState((Prev) => !Prev);
      });
    }
  };

  const HeartOn = () => {
    return (
      <span
        style={{ cursor: 'pointer', color: 'red', marginLeft: '5px' }}
        onClick={handleHeart}
        className='material-icons'
      >
        favorite
      </span>
    );
  };

  const HeartOff = () => {
    return (
      <span
        style={{ cursor: 'pointer', marginLeft: '5px' }}
        onClick={handleHeart}
        className='material-icons'
      >
        favorite_border
      </span>
    );
  };

  // heart compo
  const Heart = () => {
    return heart ? <HeartOn /> : <HeartOff />;
  };

  // commentInput compo
  const CommentInput = () => {
    return (
      <InputGroup>
        <Form.Control
          disabled={username === undefined}
          id='comAdd'
          ref={comRef}
        />
        <Button
          aria-describedby='comAdd'
          onClick={handleCom}
          disabled={userId === undefined}
        >
          댓글 등록
        </Button>
      </InputGroup>
    );
  };

  return (
    <>
      <br />
      <Card size='lg'>
        <Card.Header style={{ display: 'flex', justifyContent: 'end' }}>
          {likeCnt ? likeCnt : post?.likeCnt}
          <Heart />
        </Card.Header>
        <ListGroup>
          {comments?.map((c, i) => {
            return (
              <ListGroup.Item key={i}>
                <Row>
                  <Col>{c?.username}</Col>
                  <Col xs={7}>{c?.comment}</Col>
                  <Col>
                    {c?.userId === userId && (
                      <StBtn
                        onClick={() => {
                          dispatch(deleteCommentAX(postId, c?.commentId));
                          setChangeState((Prev) => !Prev);
                        }}
                      >
                        삭제
                      </StBtn>
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Card>
      <br />
      <CommentInput />
    </>
  );
};

export default ComCard;
