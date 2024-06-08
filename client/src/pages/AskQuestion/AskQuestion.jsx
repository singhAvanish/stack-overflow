import React, { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { askQuestion } from '../../actions/question';
import './AskQuestion.css';


const AskQuestion = () => {
  const [questionTitle,setQuestionTitle]=useState('')
  const [questionBody,setQuestionBody]=useState('')
  const [questionTags,setQuestionTags]=useState('')
  const dispatch=useDispatch()
  const user = useSelector((state)=>(state.currentUserReducer))
  const navigate=useNavigate('')
  const handleSubmit=(e)=>{
e.preventDefault()
dispatch(askQuestion({questionTitle,questionBody,questionTags,userPosted:user.result.name,userId:user?.result?._id},navigate))
  }
  const handleEnter=(e)=>{
    if(e.key==='Enter'){
      setQuestionBody(questionBody + "\n")
    }

  }
  

  return (
  <div className='ask-question'>
    <div className='ask-ques-container'>
      <h1>Ask a public Question</h1>
      <form onSubmit={handleSubmit}>
        <div className='ask-form-container'>
        <label htmlFor='ask-ques-title'>
          <h4>Title</h4>
          <p>Be specific and imagine yor are asking a question to another person.</p>
          <input type='text' onChange={(e)=>{setQuestionTitle(e.target.value)}} placeholder='placeholder="e.g. Is there an R function for finding the index of an element in a vector?"' id='ask-ques-title'/>

        </label>
        <label htmlFor='ask-ques-body'>
          <h4>Body</h4>
          <p>Include all the information someone would need to answer your
                question.</p>
          <textarea onChange={(e)=>{setQuestionBody(e.target.value)}} type='text' cols='30' rows='10'  id='ask-ques-body' onKeyDown={handleEnter}/>

        </label>
        <label htmlFor='ask-ques-tags'>
          <h4>Tags</h4>
          <p>Add up to 5 tags to describe what your question is about</p>
          <input onChange={(e)=>{setQuestionTags(e.target.value.split(" "))}} type='text' placeholder="e.g. (xml typescript wordpress)" id='ask-ques-tags'/>

        </label>

        </div>
        <input className='review-btn' type='submit' value='Review your question'/>
      </form>
    </div>
  </div>
  )
}

export default AskQuestion
