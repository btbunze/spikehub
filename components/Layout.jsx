export class Layout extends React.Component {

    render() {
        return (
            <>
                <link rel="image_src" href="https://res.cloudinary.com/dicfhqxoo/image/upload/v1594781483/thumbnails/Screenshot_67_l9wiq3.png" />
                {this.props.children}
            </>
        )
    }

}

export default Layout;