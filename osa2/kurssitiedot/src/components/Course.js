const Header = (props) => {
    return (
      <div>
        <h2>{props.course}</h2> 
      </div>
    )
  }
  
  const Part = (props) => {
    return (
      <div>
        <p>{props.name} {props.exercises}</p>
      </div>
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part => 
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        )}
      </div>
    )
  }
  
  const Total = ({ parts }) => {
    //const array = parts.map(part => part.exercises)
    
    const initialValue = 0
    const sum = parts.reduce(
      (total, currentValue) => total + currentValue.exercises,
      initialValue
    )
  
    return (
      <div>
        <strong>Total of {sum} exercises</strong>
      </div>
    )
  }

const Course = ({ course }) => {
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }

export default Course