function StatCard({
    title,
    value,
    icon,
    description
}) {

    return (

        <div className="stat-card">

            <div className="stat-top">

                <div>

                    <p className="stat-title">
                        {title}
                    </p>

                    <h2>
                        {value ?? 0}
                    </h2>

                </div>

                <div className="stat-icon">
                    {icon}
                </div>

            </div>


            {description && (

                <p className="stat-description">
                    {description}
                </p>

            )}

        </div>

    );
}


export default StatCard;