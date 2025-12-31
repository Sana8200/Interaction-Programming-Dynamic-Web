import "/src/style/style.css";

export function UserBarView(props) {
    const initial = props.user.email ? props.user.email.charAt(0).toUpperCase() : "?";

    return (
        <div className="user-bar">
            <div className="user-info">
                <span className="user-avatar">{initial}</span>
                <span className="user-email">{props.user.email}</span>
            </div>
            <button className="logout-button" onClick={props.onLogout}>
                Sign Out
            </button>
        </div>
    );
}