
import homeImage from '../../assets/homeImage.png';
import logo from '../../assets/logo.svg';

export function defaultConfigurationValues() {
    const defaultConfigurationValues2 = {
        channelSettings: {
            editGrid: 'grid',
            showInPage: '20',
            columns: '3',
            mainColor: '#4B0083',
            buttonStyle: '50',
            showCounterViews: true
        },
        editHeader: {
            alignment: 'left',
            image: {
                channel: homeImage,
                logo: logo
            },
            text: {
                title: '',
                body: ''
            },
            textColor: {
                title: '#ffffff',
                body: '#ffffff'
            },
            fontSize: {
                title: '50px',
                body: '10px'
            }
        },
        editSubscription: {
            name: true,
            email: true,
            phone: false,
            adress: false,
        }
    }
    return defaultConfigurationValues2;
}