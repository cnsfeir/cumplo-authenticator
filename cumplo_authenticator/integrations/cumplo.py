import requests
from bs4 import BeautifulSoup
from cumplo_common.models.user import User

from cumplo_authenticator.utils.constants import AUTHENTICITY_TOKEN_SELECTOR, CUMPLO_LOGIN_URL, SESSION_COOKIE_NAME

Cookie = str


def login(user: User) -> Cookie:
    """
    Logs in a user and returns the session cookie.

    Args:
        user (User): User to log in.

    Returns:
        Cookie: Session cookie.
    """
    session = requests.Session()

    response = session.get(CUMPLO_LOGIN_URL, params={"email": user.credentials.email})

    soup = BeautifulSoup(response.text, "html.parser")
    token = soup.select_one(AUTHENTICITY_TOKEN_SELECTOR)["value"]

    session.post(
        CUMPLO_LOGIN_URL,
        data={
            "utf8": "✓",
            "authenticity_token": token,
            "user[email]": user.credentials.email,
            "user[password]": user.credentials.password,
        },
    )
    cookie = session.cookies.get(SESSION_COOKIE_NAME)
    return cookie
