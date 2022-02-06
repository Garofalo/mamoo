import Header from '../Header/Header'

const Layout = (props) => (
    <div className='layout'>
    
        <div className="layout-children">
            {props.children}
        </div>
    
    </div>
)

export default Layout
