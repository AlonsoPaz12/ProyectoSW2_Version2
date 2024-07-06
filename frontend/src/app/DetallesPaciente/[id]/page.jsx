import DetallesPaciente from '../page'

const page = ({params}) => {
  return (
    <DetallesPaciente id={params.id}/>
  )
}

export default page