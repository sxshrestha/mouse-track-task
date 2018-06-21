import boto3
import pprint

region_name = 'us-east-1'
aws_access_key_id = 'AKIAIPRMQT5VI4XVZECA'
aws_secret_access_key = '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'

endpoint_url = 'https://mturk-requester-sandbox.us-east-1.amazonaws.com'
# Uncomment this line to use in production

# endpoint_url = 'https://mturk-requester.us-east-1.amazonaws.com'

client = boto3.client(
    'mturk',
    endpoint_url=endpoint_url,
    region_name=region_name,
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key,
)

def delete():
    for hit in client.list_hits()['HITs']:
        client.delete_hit(HITId=hit['HITId'])


pprint.pprint( client.list_hits() );

'''
paginator = client.get_paginator('list_assignments_for_hit')

response_iterator = paginator.paginate(
    HITId='39HYCOOPKOFWR5LF41VC71J2WVDMD9',
    AssignmentStatuses=[
        'Submitted'
    ],
    PaginationConfig={
        'MaxItems': 5
    }
)

pprint.pprint(client.list_assignments_for_hit(
    HITId='39HYCOOPKOFWR5LF41VC71J2WVDMD9',
    AssignmentStatuses=[
        'Submitted'
    ]
))
#for i in response_iterator:
    #pprint.pprint(i)
'''
