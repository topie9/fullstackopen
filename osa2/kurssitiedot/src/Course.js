import React from 'react';

const Header = ({ name }) => {
  return (
    <div>
      <h2>
        {name}
      </h2>
    </div>
  )
}

const Content = ({ parts }) => {
  const courseParts = () => parts.map(part =>
    <Part 
      key={part.id} 
      name={part.name} 
      exercises={part.exercises} 
    />
  )
  // count total number of exercises of all parts
  const totalExs = () => parts.reduce((acc, cur) => 
    acc + cur.exercises
  , 0)
  
  return (
    <div>
      {courseParts()}
      <p>
        <b>total of {totalExs()} exercises</b>
      </p>
    </div>
  )
}

const Part = ({ name, exercises }) => {
  return (
    <div>
      <p>
        {name} {exercises}
      </p>
    </div>
  )
}

const Course = ({ courses }) => {
  const courseInfo = () => courses.map(course =>
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </div>
  )
  return (
    <div>
      {courseInfo()}
    </div>
  )
}

export default Course