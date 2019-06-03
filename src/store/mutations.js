export default {
    CURRENT_USER(state, {fullName, profilePicture}) {
        state.currentUser.fullName = fullName;
        state.currentUser.profilePicture = profilePicture;
    },
    
    CURRENT_ORGANIZATION(state, {_id, name, shortName, color, theme, cover, title, description, contactLocation, contactEmail}) {
        if (_id) {
            state.currentOrganization._id = _id;
        }
        if (name) {
            state.currentOrganization.name = name;
        }
        if (shortName) {
            state.currentOrganization.shortName = shortName;
        }
        if (color) {
            state.currentOrganization.color = color;
        }
        if (theme) {
            state.currentOrganization.theme = theme;
        }
        if (cover) {
            state.currentOrganization.cover = cover;
        }
        if (title) {
            state.currentOrganization.title = title;
        }
        if (description) {
            state.currentOrganization.description = description;
        }
        // state.currentOrganization.contactLocation = contactLocation;
        // if (contactLocation) {
        // }
        // state.currentOrganization.contactEmail = contactEmail;
        // if (contactEmail) {
        // }
    },

    SET_CURRENT_ORGANIZATION_DEFAULTS(state) {
        state.currentOrganization = {
            _id: '',
            name: '',
            shortName: '',
            color: '',
            theme: '',
            cover: null,
            title: null,
            description: null,
            contactLocation: null,
            contactEmail: null,
        };
    }
}