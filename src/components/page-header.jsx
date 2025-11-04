import Sticky from 'react-stickynode';
import './component-styling.css'

function PageHeader() {
    return (
        <Sticky enabled={true} top={0} innerZ={1000}>
            <div className="bg-secondary py-2 px-3 header-shadow">
                <h2 className="text-light">Strudel - Live Code Music</h2>
            </div>
        </Sticky>
    )
}

export default PageHeader;