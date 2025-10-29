import './PageHeader.css';

function PageHeader() {
  return (
    <>
    <div className="col-md-12 text-center mt-4 mb-4">
      <h1 className="display-4 fw-bold text-neon">Strudel Demo</h1>
      <p className="small mt-2">Enhanced by Benjamin Rebbeck: 110447076</p>
    </div>
    <div className="col-md-2">
        <button class="btn btn-primary me-2">Save JSON</button>
        <button class="btn btn-primary">Load JSON</button>
    </div>
    </>
  );
}

export default PageHeader;