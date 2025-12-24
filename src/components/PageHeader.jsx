import { Link } from 'react-router-dom';

export default function PageHeader({ title, buttonText, buttonLink, buttonVariant = "success" }) {
    return (
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">{title}</h2>
            {buttonText && buttonLink && (
                <Link
                    to={buttonLink}
                    className={`btn btn-${buttonVariant} px-4 shadow-sm d-flex align-items-center gap-2`}>
                    <i className="bi bi-plus-lg"></i>
                    {buttonText}
                </Link>
            )}
        </div>
    );
}
