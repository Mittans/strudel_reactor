import Sticky from 'react-stickynode';

function PageHeader() {
    return (
        <Sticky enabled={true} top={0} innerZ={1000}>
            <div className="bg-secondary py-2 px-3">
                <h2 className="text-light">Strudel Demo</h2>
            </div>
        </Sticky>
    )
}

export default PageHeader;