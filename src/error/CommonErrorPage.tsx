import React from 'react'

interface ICommonErrorPageProps{
    error?:IErrorData;
}

interface IErrorData{
    type: string;
    //Erorr Context
    hard_limit?: string;
    soft_limit?: string;
    error?: string;
    block_duration?: string;
}

const CommonErrorPage = (props:ICommonErrorPageProps) =>{

    const { type, hard_limit,soft_limit,error,block_duration } = props.error || {};

    return(
        <div>
            <h3>Unexpected Error Occurred</h3>
            <div>{error || 'Not error props context'}</div>
            <div>{type || 'Not type props context'}</div>
            <div>{hard_limit || 'Not hard limit props context'}</div>
            <div>{soft_limit || 'Not soft limit props context'}</div>
            <div>{block_duration || 'Not block duration context'}</div>
        </div>
    );
}
  

export default CommonErrorPage;