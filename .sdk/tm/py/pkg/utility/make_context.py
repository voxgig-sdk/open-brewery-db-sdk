# OpenBreweryDb SDK utility: make_context

from projectname_sdk.core.context import OpenBreweryDbContext


def make_context_util(ctxmap, basectx):
    return OpenBreweryDbContext(ctxmap, basectx)
