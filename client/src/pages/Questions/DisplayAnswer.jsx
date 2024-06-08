
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import Avtar from '../../components/Avtar/Avtar';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAnswer } from '../../actions/question';
import './Questions.css'; 

const DisplayAnswer = ({ question, handleShare }) => {
  const User = useSelector((state) => state.currentUserReducer);
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleDelete = (answerId, noOfAnswers) => {
    dispatch(deleteAnswer(id, answerId, noOfAnswers - 1));
  };

  return (
    <div>
      {question.answer.map((ans) => (
        <div className='question-details' key={ans._id}>
          <p>{ans.answerBody}</p>
          <div className='question-actions-user'>
            <button type='button' onClick={handleShare}>Share</button>
            {User?.result?._id === ans?.userId && (
              <button type='button' onClick={() => handleDelete(ans._id, question.noOfAnswers)}>Delete</button>
            )}
          </div>
          <div>
            <p>answered {moment(ans.answeredOn).fromNow}</p>
            <Link to={`/Users/${ans.userId}`} className='userlink' style={{ color: '#00868' }}>
              <Avtar backgroundColor='green' px='8px' py='5px' borderRadius='4px'>
                {ans.userAnswered.charAt(0).toUpperCase()}
              </Avtar>
              <div>{ans.userAnswered}</div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayAnswer;

