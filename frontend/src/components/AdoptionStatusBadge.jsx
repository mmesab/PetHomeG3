export default function AdoptionStatusBadge({ status }) {
    const getBadgeStyle = () => {
        switch (status?.toUpperCase()) {
            case 'APPROVED':
                return { backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb', label: 'Aprobada' };
            case 'REJECTED':
                return { backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb', label: 'Rechazada' };
            case 'PENDING':
            default:
                return { backgroundColor: '#fff3cd', color: '#856404', border: '1px solid #ffeeba', label: 'Pendiente' };
        }
    };

    const style = getBadgeStyle();

    return (
        <span style={{
            backgroundColor: style.backgroundColor,
            color: style.color,
            border: style.border,
            padding: '4px 12px',
            borderRadius: '16px',
            fontSize: '12px',
            fontWeight: 'bold',
            display: 'inline-block'
        }}>
            {style.label}
        </span>
    );
}