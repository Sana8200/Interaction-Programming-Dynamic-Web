import "../style/style.css";

export function UserBarView(props) {
    const { user, onLogout } = props;
    const initial = user.email ? user.email.charAt(0).toUpperCase() : "?";

    return (
        <div className="user-bar">
            <div className="user-info">
                <span className="user-avatar">{initial}</span>
                <span className="user-email">{user.email}</span>
            </div>
            <button className="logout-button" onClick={onLogout}>
                Sign Out
            </button>
        </div>
    );
}
