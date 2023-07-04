interface DisplayProps {
  inputDisplay: string;
  outputDisplay: string;
}

export default function Display(props: DisplayProps) {
  return (
    <div className="display">
      <h2 className="output-display">
        {props.outputDisplay}
      </h2>
      <h1 className="input-display">
        {props.inputDisplay}
      </h1>
    </div>
  );
}
