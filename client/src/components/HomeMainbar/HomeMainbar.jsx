import React from 'react';
import "./HomeMainbar.css";
import { useLocation, useNavigate } from 'react-router-dom';

import QuestionList from './QuestionList';
import { useSelector } from 'react-redux';

const HomeMainbar = () => {
  const location = useLocation();
  
  const navigate = useNavigate();
  const questionsList = useSelector(state => state.questionsReducer.data); 

  const checkAuth = () => {
    if (localStorage.length === 0) {
      alert("login or signup to ask a question");
      navigate('/Auth');
    } else {
      navigate('/AskQuestion');
    }
  };

  return (
    <div className='main-bar'>
      <div className='main-bar-header'>
        {location.pathname === '/' ? <h1>Top questions</h1> : <h1>All questions</h1>}
        <button onClick={checkAuth} className='ask-btn'>Ask Question</button>
      </div>
      <div>
        {questionsList === null ? <h1>Loading...</h1> :
          <>
            <p>{questionsList.length} questions</p>
            <QuestionList questionsList={questionsList}></QuestionList>
          </>
        }
      </div>
    </div>
  );
};

export default HomeMainbar;
