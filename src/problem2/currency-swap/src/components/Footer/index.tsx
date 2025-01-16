import './index.scss';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className='footer'>
      <p className="footer__text">&copy; 99Tech {year}</p>
    </div>
  )
}
