import Header from "../Header/Header"
const Layout = (props) => (
    <div className='layout'>
        <Header profile={props.profile} setProfile={props.setProfile} />
        <div className="layout-children">
            {props.children}
        </div>
    
    </div>
)

export default Layout
