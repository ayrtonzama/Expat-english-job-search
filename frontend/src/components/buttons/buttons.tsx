export function PrimaryButton(props:{text:string,handler:()=>{}}){
    return (
        <div>
            <button className="btn btn-primary" onClick={props.handler}>{props.text}</button>
        </div>
    )
}