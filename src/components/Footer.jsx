import { Github, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <div>
        <footer className="footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-10">
        <nav className="grid grid-flow-col gap-4">
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-4">
            
            <a>
              <Linkedin />
            </a>
            <a>
              <Github />
            </a>
          </div>
        </nav>
        <aside>
          <p>Copyright © {new Date().getFullYear()} - All right reserved by Spokn</p>
        </aside>
      </footer>
    </div>
  )
}

export default Footer
