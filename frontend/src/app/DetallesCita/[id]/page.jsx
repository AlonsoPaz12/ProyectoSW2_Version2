
import React from 'react'
import DetallesCita from '../page'


export default function Page({ params }) {
     return (
      <DetallesCita id={params.id}/>
     )
    }