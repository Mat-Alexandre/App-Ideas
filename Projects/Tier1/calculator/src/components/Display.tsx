interface DisplayProps {
  mainDisplay: string;
  auxiliaryDisplay: string;
}

export default function Display(props: DisplayProps) {
  return (
    <div className="display">
      <h2 className="auxiliary-display">
        {props.auxiliaryDisplay}
      </h2>
      <h1 className="main-display">{props.mainDisplay}</h1>
    </div>
  );
}
