import './PageHeader.css';
import JsonLoad from './json-control/JsonLoad';
import JsonSave from './json-control/JsonSave';

function PageHeader({strudelCode, cpm, volume, setStrudelCode, setCpm, setVolume}) {
  return (
    <>
    <div className="col-md-12 text-center mt-4 mb-4">
      <h1 className="display-4 fw-bold text-neon">Strudel Demo</h1>
      <p className="small mt-2">Enhanced by Benjamin Rebbeck: 110447076</p>
    </div>
    <div className="col-md-2">
      <JsonSave strudelCode={strudelCode} cpm={cpm} volume={volume}/>
      <JsonLoad setStrudelCode={setStrudelCode} setCpm={setCpm} setVolume={setVolume}/>
    </div>
    </>
  );
}

export default PageHeader;