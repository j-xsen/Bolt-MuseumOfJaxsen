interface BoltIconProps {
    color?: string;
    size?: 'small' | 'medium' | 'large';
}

function BoltIcon({
    size = 'large'
}: BoltIconProps) {
    // Determine size dimensions
    const dimensions = {
        small: { badge: 30 },
        medium: { badge: 60 },
        large: { badge: 100 }
    };

    const { badge } = dimensions[size];

    return (
        <a href={"https://bolt.new/"}>
        <div className="fixed right-0 bottom-0 mr-4 mb-4 z-10">
            {/* Bolt Icon with Badge */}
            <div
                style={{
                    backgroundImage: `url(https://raw.githubusercontent.com/kickiniteasy/bolt-hackathon-badge/refs/heads/main/src/public/bolt-badge/black_circle_360x360/black_circle_360x360.webp)`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    width: `${badge}px`, 
                    height: `${badge}px`,
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                }}
            >
            </div>
        </div>
        </a>
    );
}

export default BoltIcon;
