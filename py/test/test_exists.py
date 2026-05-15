# ProjectName SDK exists test

import pytest
from openbrewerydb_sdk import OpenBreweryDbSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = OpenBreweryDbSDK.test(None, None)
        assert testsdk is not None
