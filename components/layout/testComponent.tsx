type ComponentType = {
  nama: string
  age: number
}

const TestComponent = ({ nama, age }: ComponentType) => {
  return (
    <div>hai nama saya {nama} and my age is {age}</div>
  )
}

export default TestComponent