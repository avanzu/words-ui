/**
 * Created by avanzu on 03.02.17.
 */
export default function(user) {
    if (! user ) {
        return {};
    }
    return {"Authorization" : "Bearer " + user.access_token}
}