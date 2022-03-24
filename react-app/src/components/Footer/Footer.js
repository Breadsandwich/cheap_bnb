import './Footer.css'

const Footer = () => {
    return (
        <div className="footer_container">
            <div className="footer_elements">
               <div className="about_me">
                    <div className='developer'>
                        Developed by: Daniel Thai
                    </div>

                    <div className='social_icon'>
                        <a href="https://github.com/Breadsandwich" className="footer-icon" target='_blank' rel='noreferrer'>
                        <i className='fab fa-github' />
                        </a>
                    </div>

                    <div className='social_icon'>
                        <a href="https://www.linkedin.com/in/daniel--thai/" className='footer-icon' target='_blank' rel='noreferrer'>
                        <i className='fab fa-linkedin' />
                        </a>
                    </div>
               </div>

               <div> ________________________________________________________________________ Technologies Used  ________________________________________________________________________ </div>
               <div className='technologies'>
                    <div>Javascript</div>
                    <div>React</div>
                    <div>Redux</div>
                    <div>Python</div>
                    <div>Flask</div>
                    <div>SQLalchemy</div>
                    <div>Amazon S3</div>
                    <div>Docker</div>
                    <div>CSS</div>
               </div>

            </div>
        </div>
    )
}

export default Footer
