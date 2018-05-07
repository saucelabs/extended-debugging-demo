def get_load_time(req):
    load_time = 0
    if not req.has_key('timing'):
        return load_time
    for key, value in req['timing'].items():
        if key == 'requestTime' or value == -1:
            continue
        load_time += value
    return load_time
